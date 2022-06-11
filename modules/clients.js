import { Db, ObjectId } from 'mongodb';
import { Connection } from '../connection.js';


class Client {
    static async getClientInfo(req, res) {
        try {
            const users = await Connection.db.collection('users')
                .find()
                .toArray();
            res.status(200).send(JSON.stringify(users));
        } catch (exception) {
            res.status(500).send();
        }
    }

    // static async updateClientData(req, res) {
    //     try {
    //         await Connection.db.collection('users').remove();
    //         await Connection.db.collection('users').insertMany([]);
    //         res.send(JSON.stringify({ success: true }));
    //     } catch (exception) {
    //         res.status(500).send();
    //     }
    // }


    static async registerUser(req, res, params) {
        try {
            const userData = {
                firstName: params.firstName,
                lastName: params.lastName,
                email: params.email,
                phone: params.phone
            }
            if(params._id){
                await Connection.db.collection('users').updateOne({_id: ObjectId(params._id)}, 
                {
                    $set: userData
                });
                res.status(200).send({
                    success: true
                });
            } else {
                await Connection.db.collection('users').insertOne(
                    userData
                );
                res.status(200).send({
                    success: true
                });
            } 
        } catch (error) {
            res.status(500).send({error:true})
        }
    }

    static async deleteUser(req, res, params) {
        try {
            await Connection.db.collection('users').deleteOne({
                _id: ObjectId(params._id)
            });
            res.status(200).send({
                success: true
            })
        } catch (error) {
            res.status(500).send({ error: true })
        }
    }
}

export { Client };



