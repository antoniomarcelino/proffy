import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem{
    week_day: number;
    from: string;
    to: string;
}
export default class ClassesController{

    async index(request: Request, response: Response) {
        const filters = request.query;
        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if( !filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search'
            });
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedules.*')
            .from('class_schedules')
            .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedules`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedules`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedules`.`to` > ?? ', [timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
    
        try{
            const insertedUsers = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertedUsers[0];
        
            const insertedClasses = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClasses[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem)=> {
                
                return{
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })
        
            await trx('class_schedules').insert(classSchedule);
            
            await trx.commit();
        
            return response.status(201).send();
        }catch(err){
            console.log(err);
            await trx.rollback();
            return response.status(400).json({
                error: 'ERROR 404'
            })
        }
    }
}