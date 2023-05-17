import { Body, Post, Get, Delete, Patch, Controller, Param, ParseIntPipe } from '@nestjs/common'
import { AreasService } from './areas.service'
import { CrearAreaInterface, ModificarAreaInterface } from './entity/area.interface'

@Controller('areas')
export class AreasController {
    constructor(private areasService: AreasService) {}

    @Post()
    crearArea(@Body() nuevaArea: CrearAreaInterface) {
        return this.areasService.crearArea(nuevaArea)
    }

    @Get(':id')
    obtenerArea(@Param('id', ParseIntPipe) id: number) {
        return this.areasService.obtenerArea(id)
    }

    @Get()
    obtenerAreas() {
        return this.areasService.obtenerAreas()
    }

    @Patch(':id')
    modificarArea(@Param('id', ParseIntPipe) id: number, @Body() area: ModificarAreaInterface) {
        return this.areasService.modificarArea(id, area)
    }

    @Delete(':id')
    eliminarArea(@Param('id', ParseIntPipe) id: number) {
        return this.areasService.eliminarArea(id)
    }
}

