import { auth } from "../services/firebase";

export function signIn(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}
export function signOut() {
    return auth().signOut()
}