/*
|--------------------------------------------------------------------------
| Scheduler file
|--------------------------------------------------------------------------
|
| The scheduler file is used to define scheduled jobs that run
| at regular intervals.
|
*/

import CleanupExpiredPoemsJob from '#jobs/cleanup_expired_poems_job'

CleanupExpiredPoemsJob.schedule({}).every('1h')
