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
    medication?: Medication
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
            schedule: [],
            tracking: [],
            medication: { count: 20, name: 'Panadol'} as Medication,
        },
        {
            id: count++,
            name: "Mrs. Elder Two",
            schedule: [],
            tracking: [],
            medication: { count: 20, name: 'Red Pill'} as Medication,
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
            tracking: []
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

}

const startScheduler = (patientData: Patient[]) => {
    setInterval( () => {
        const timeNow = DateTime.now();

        // set notified to true
        patientData.map( patient => {
            patient.tracking
                .filter( trackRecord => trackRecord.status !== 'Pending')
                .map( trackRecord => {
                    const schedule = patient.schedule.find( sched => sched.id === trackRecord.scheduleId)
                    if (schedule?.isNotified)
                        schedule.isNotified = false;
                })
        });

        // adding of tracking record
        patientData.map( patient => {
            // check if patient's sched is reached and not yet notified
            //     if patient's sched is reached, add a track record
            patient.schedule.map (sched => {

            })
        })


    }, 500);
}