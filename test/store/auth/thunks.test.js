
import { logingWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingAuthentication, checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogoutFirebase } from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');


describe('pruebas en AuthThunks', () => { 

    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('debe de invocar el checkingCredentials', async() => { 
        
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        
    });


    test('startGoogleSingIn debe llamar checkingCredentials y login - Exito', async() => { 

        const loginData ={ ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue( loginData );
        
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

     });

     test('startGoogleSingIn debe llamar checkingCredentials y logout - Error', async() => { 

        const loginData ={ ok: false, errorMessage: 'un error en google' }
       
        await signInWithGoogle.mockResolvedValue( loginData );
        
        await startGoogleSignIn()( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

     });

     test('startLoginWithEmailPassword debe de llamar checkingCredential y login - Exito', async() => { 
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await logingWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

      });

      test('startLoginWithEmailPassword debe de llamar checkingCredential y logout - Error', async() => { 
        
        const logoutData = { ok: false, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await logingWithEmailPassword.mockResolvedValue( logoutData );
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( logoutData ) );

      });

      test('startLogoutFirebase debe de llamar logoutFirebase, clearNotes, y logout', async() => { 

        await startLogoutFirebase()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );



       });

       test('startCreatingUserWithEmailPassword debe llamar checkingCredentials, registerUserWithEmailPassword y login - Exito', async() => { 

        const userData = { email: demoUser.email, displayName: demoUser.displayName, password: '123456', ok: true, ...demoUser };
        
        
        await registerUserWithEmailPassword.mockResolvedValue( userData );
        await startCreatingUserWithEmailPassword( userData )( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( registerUserWithEmailPassword ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( login(userData) );

       });

 });