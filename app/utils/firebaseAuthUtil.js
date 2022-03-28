import { auth } from '../firebaseWrapper';

export const authWithFirebase = async (email, password) => {
  try {
    const providers = await auth.fetchSignInMethodsForEmail(email);
    if (providers.length === 0) {
      return {
        err: true,
        errMessage: 'Password or username is incorrect',
        uuid: '',
      };
    }
    if (providers.indexOf('password') === -1) {
      return {
        err: true,
        errMessage: 'Password or username is incorrect',
        uuid: '',
      };
    }

    const result = await auth.signInWithEmailAndPassword(email, password);
    const { user } = result;

    if (!user || !user.uid) {
      return {
        err: true,
        errMessage: 'Password or username is incorrect',
        uuid: '',
      };
    }

    return {
      err: false,
      errMessage: '',
      uuid: user.uid,
    };
  } catch (err) {
    console.log(err);
    return {
      err: true,
      errMessage: 'Password or username is incorrect',
      uuid: '',
    };
  }
};
