import * as Create from './Create'
import * as GetAll from './GetAll'
import * as GetById from './GetByID'
import * as UpdateById from './UpdateByID'
import * as DeleteById from './DeleteByID'
import * as Count from './Count'

export const PessoasProvider = {
    ...Create,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...DeleteById,
    ...Count
}
