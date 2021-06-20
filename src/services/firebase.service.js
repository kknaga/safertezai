export default {
  db: undefined,

  init() {
    window.firebase.initializeApp({
      apiKey: "AIzaSyCNWm6py2YzCnB4DQavcKk4AxQwSVWV3VI",
      authDomain: "safertezai.firebaseapp.com",
      projectId: "safertezai",
      storageBucket: "safertezai.appspot.com",
      messagingSenderId: "752172431474",
      appId: "1:752172431474:web:141dea72307fdb62e26aeb",
      measurementId: "G-SCS66FGXS8",
    })
    window.firebase.analytics();
    window.firebase.auth().signInAnonymously()

    this.db = window.firebase.firestore()
  },

  login(email, password) {
    return window.firebase.auth().signInWithEmailAndPassword(email, password)
  }
}