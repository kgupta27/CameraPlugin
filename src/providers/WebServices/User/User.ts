export class User {

    uid: string;
    name: number;
    age: number;
    rssi: number;
    proximity: string;
    accuracy: number;

    constructor(public user: any) {
        // debugger;
        console.log('user data = ',user);
        this.uid = user.userId;
        this.name = user.userName;

    }
}