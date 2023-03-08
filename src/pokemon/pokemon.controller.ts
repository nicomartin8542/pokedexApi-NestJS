import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  // HttpCode,
  // HttpStatus,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { ParseMongoIdPipe } from 'src/common/pipe/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  //@HttpCode(HttpStatus.OK) -> Asi puedo definir por defecto el status code para peticiones existosas
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':condition')
  findOne(@Param('condition') condition: string) {
    return this.pokemonService.findOne(condition);
  }

  @Patch(':condition')
  update(
    @Param('condition') condition: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(condition, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
  @Delete('')
  removeAll() {
    return this.pokemonService.removeAll();
  }
}
