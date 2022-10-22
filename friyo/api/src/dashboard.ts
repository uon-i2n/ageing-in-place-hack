import { Express, Request, Response } from 'express';
import { DateTime } from 'luxon';

type Medication = {
    name: string
    count: number
}

type History = {
    takenAt: string | Date
    status: AdministerStatus
}

type AdministerStatus = 'Missed' | 'Taken';

// Daily
type Schedule = {
    id: number
    intakeTime: string
    frequency: number
    isNotified: boolean
}

type Patient = {
    id: number
    name: string
    medication: string
    schedule: Schedule[]
    prescriptionCount?: number
    tracking: TrackingRecord[]
}

type TrackingRecord = {
    id: number,
    scheduleId: number  // to reset the schedule back to false
    status: string  // Missed, Late, OnTime, Pending
    takenAt: string // DateTime
    medicationName: string
};


export const Dashboard = (app: Express) => {
    let count = 0;

    const patientData: Patient[] = [
        {
            id: count++,
            name: "Mr. Elder One",
            schedule: [{
                id: 0,
                frequency: 2,
                intakeTime: '14:59',
                isNotified: false
            }],
            tracking: [],
            medication: 'Panadol'
        },
        {
            id: count++,
            name: "Mrs. Elder Two",
            schedule: [],
            tracking: [],
            medication: 'Red Pill'
        }

    ];

    // start the timer
    startScheduler(patientData);

    app.get('/dashboard/patients', (req: Request, res: Response) => {
        return res.json({
            status: 'success',
            data: patientData
        });
    });

    app.get('/dashboard/patients/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params['id']);
        const patient = patientData.find( p => p.id === id)
        return res.json({
            status: 'success',
            data: patient
        });
    });

    // Register a patient
    app.post('/dashboard/patients', (req: Request, res: Response) => {

        const body = req.body;
        const newPatient: Patient = {
            id: count++,
            name: body.name,
            schedule: [],
            tracking: [],
            medication: body.medication
        };
        patientData.push(newPatient);

        return res.json({
            status: 'success',
            data: newPatient
        });
    });

    // Get all the schedules
    app.get('/dashboard/patients/:id/schedules', (req: Request, res:Response) => {
        return res.json({
            status: 'error',
            data: {
                description: 'API not implemented yet'
            }
        });
    });

    // set a Schedule for a patient
    app.post('/dashboard/patients/:id/schedules', (req: Request, res: Response) => {
        const patientId = parseInt(req.params['id']);
        const schedData = req.body;

        const patient = patientData
            .filter( p => p.id === patientId)
            .map( patient => {
                const scheds = patient.schedule;
                patient.schedule = [...scheds, {
                    id: patient.schedule.length++,
                    frequency: parseInt(schedData['frequency']),
                    intakeTime: schedData['intakeTime'],
                    isNotified: false
                }]
                return patient;
            });
        return res.json({
            status: 'success',
            data: patient[0].schedule
        });
    });

    app.post('/dashboard/patients/:patientId/dispense/:trackId', (req: Request, res: Response) => {
        const patientId = parseInt(req.params["patientId"]);
        const trackId = parseInt(req.params['trackId']);

        const patient = patientData.find( patient => patient.id === patientId);
        const tracker = patient?.tracking.find(tracker => tracker.id === trackId);
        if (patient) {
            if (tracker) {
                const now = DateTime.now();
                tracker.takenAt = now.toISO();

                const sched = patient.schedule.find(sched => sched.id === tracker.scheduleId);
                if (sched) {
                    tracker.status = timeToIso(sched.intakeTime).diff(now, ['minutes']).as('minutes') > 30 ? 'Late' : 'In Time'
                }
            }
        }

        return res.json({
            status: 'success',
            data: {}
        })
    });

}

const timeToIso = (intakeTime: string) => {
    const timeNow = DateTime.now();
    const year = timeNow.year;
    const month = timeNow.month;
    const second = timeNow.second;
    const millis = timeNow.millisecond;
    const day = timeNow.day;
    const hour = parseInt(intakeTime.split(':')[0]);
    const minute = parseInt(intakeTime.split(':')[1]);
    return DateTime.local(year, month, day, hour, minute, 0, 0);
}

const startScheduler = (patientData: Patient[]) => {
    setInterval( () => {

        // set notified to true
        patientData.map( patient => {
            patient.tracking
                .filter( trackRecord => trackRecord.status !== 'Pending')
                .map( trackRecord => {
                    const schedule = patient.schedule.find( sched => sched.id === trackRecord.scheduleId)
                    if (schedule?.isNotified) {
                        schedule.isNotified = false;
                    }
                })
        });

        patientData.map( patient => {
            patient.tracking
                .filter( trackRecord => trackRecord.status === 'Pending')
                .map( trackRecord => {
                    const schedule = patient.schedule.find( sched => sched.id === trackRecord.scheduleId)
                    if (schedule) {
                        const intakeTime = timeToIso(schedule.intakeTime);
                        if (intakeTime.diffNow().as('minutes') > 5) {
                            trackRecord.status = 'Missed';
                        }
                    }
                })
        });

        // adding of tracking record
        patientData.map( patient => {
            // check if patient's sched is reached and not yet notified
            //     if patient's sched is reached, add a track record
            patient.schedule
                .filter(sched => !sched.isNotified)
                .map(sched => {
                    const intakeTime = timeToIso(sched.intakeTime);
                    if (intakeTime.diffNow().as('minutes') < 20) {
                        patient.tracking = [...patient.tracking, {
                            id: patient.tracking.length++,
                            medicationName: patient.medication,
                            scheduleId: sched.id,
                            status: 'Pending',
                            takenAt: ''
                        }];
                        sched.isNotified = true;
                    }

                })
        })

        console.log('\n');
        console.log(JSON.stringify(patientData));
    }, 1000);
}