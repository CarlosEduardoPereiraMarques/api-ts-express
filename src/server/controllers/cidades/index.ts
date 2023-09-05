import * as Create from './Create'
import * as GetAll from './GetAll'
import * as GetById from './GetByID'
import * as UpdateById from './UpdateByID'
import * as DeleteById from './DeleteByID'

export const CidadesController = {
    ...Create,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...DeleteById
}
