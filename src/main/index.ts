import 'module-alias/register'

import { envs } from '@/config/constants'
import { Logger } from '@/shared/logger/logger'
import app from '@/config/app'

const port = envs.PORT
app.listen(port, async () => await Logger.info(`Server running at http://localhost:${port} `))
