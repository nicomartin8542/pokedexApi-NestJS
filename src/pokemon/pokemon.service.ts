import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  //Inyectamos en el controlador el modelo de moonguse de pokemon
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      console.log(error);
      this.handleException(error);
    }
  }

  async findAll(paginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    const pokemons: Pokemon[] = await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1,
      })
      .select('-__v');
    return pokemons;
  }

  async findOne(condition: string) {
    let pokemon: Pokemon;

    if (!isNaN(+condition))
      pokemon = await this.pokemonModel.findOne({ no: condition });

    if (!pokemon && isValidObjectId(condition))
      pokemon = await this.pokemonModel.findById(condition);

    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({
        name: condition.toLocaleLowerCase().trim(),
      });

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name or no "${condition}" not found`,
      );
    }

    return pokemon;
  }

  async update(condition: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(condition);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(condition);
    // await pokemon.deleteOne();
    // return { status: 'OK' };

    //Hacemos una sola consulta para obtimizar
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new NotFoundException(`Pokemon with id ${id} does not exist`);

    return;
  }

  async removeAll() {
    // const pokemon = await this.findOne(condition);
    // await pokemon.deleteOne();
    // return { status: 'OK' };

    //Hacemos una sola consulta para obtimizar
    await this.pokemonModel.deleteMany();

    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create pokemon - check server logs`,
    );
  }
}
