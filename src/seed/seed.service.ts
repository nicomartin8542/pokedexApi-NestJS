import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PokeResponse } from './interfaces/poke-response-interface';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from '../common/adapters/Axios-adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async populateDb() {
    //Borro base de pokemons
    await this.pokemonModel.deleteMany();

    const pokemonsInsert: CreatePokemonDto[] = [];

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    data.results.forEach(async ({ name, url }) => {
      const elements = url.split('/');
      const no = +elements[elements.length - 2];
      pokemonsInsert.push({ name, no });
    });

    this.pokemonModel.insertMany(pokemonsInsert);

    return 'Pupulate execute';
  }
}
