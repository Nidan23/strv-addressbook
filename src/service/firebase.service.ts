import {initializeApp, cert} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {User} from "../interface/user.type";
import {Contact} from "../interface/contact.type";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {VariableService} from "./variable.service";

export class FirebaseService{

    private static db: Firestore
    private static app

    public static firebaseInit(){
        this.app = initializeApp({
            credential: cert(VariableService.certPath)
        });

        this.db = getFirestore(this.app)
    }

    public static async addContact(user: User, payload: Contact): Promise<boolean>{
        const userContactsPath = this.db.collection(VariableService.userCollectionPath).doc(user.email).collection(VariableService.contactsCollectionPath)
        const contactPath = userContactsPath.doc(payload.lastName)

        const returnValue = await contactPath.set(payload)
            .catch(err => {
                console.log(err)
            })

        return !!returnValue;
    }
}