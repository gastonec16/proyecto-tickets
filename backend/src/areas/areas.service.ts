import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Area } from './entity/area.entity'
import { Repository } from 'typeorm'
import { CrearAreaInterface, ModificarAreaInterface } from './entity/area.interface'

@Injectable()
export class AreasService {
    constructor(@InjectRepository(Area) private areaRepository: Repository<Area>) {}

    async crearArea(area: CrearAreaInterface) {
        const nombreRepetido = await this.areaRepository.findOne({ where: { nombre: area.nombre } })
        if (!nombreRepetido) {
            const nuevaArea = this.areaRepository.create(area)
            return this.areaRepository.save(nuevaArea)
        }
        return new HttpException('El nombre del área ya existe', HttpStatus.CONFLICT)
    }

    async obtenerArea(id: number) {
        const areaEncontrada = await this.areaRepository.findOne({ where: { id } })
        if (!areaEncontrada) {
            return new HttpException('No se encontró el área', HttpStatus.NOT_FOUND)
        }
        return areaEncontrada
    }

    async obtenerAreas() {
        return this.areaRepository.find()
    }

    async modificarArea(id: number, area: ModificarAreaInterface) {
        const areaEncontrada = await this.areaRepository.findOne({ where: { id } })
        if (!areaEncontrada) {
            return new HttpException('No se encontró el área', HttpStatus.NOT_FOUND)
        }

        const areaModificada = Object.assign(areaEncontrada, area)
        return this.areaRepository.save(areaModificada)
    }

    async eliminarArea(id: number) {
        const areaEliminada = await this.areaRepository.delete({ id })
        if (areaEliminada.affected == 0) {
            return new HttpException('No se encontró el área', HttpStatus.NOT_FOUND)
        }
        return areaEliminada
    }
}

