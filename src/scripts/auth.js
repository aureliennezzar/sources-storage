import { auth } from "../services/firebase";

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}
export function signOut() {
    return auth().signOut()
}