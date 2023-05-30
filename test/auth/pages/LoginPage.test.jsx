import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn } from "../../../src/store/auth/thunks";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSingIn = jest.fn();
const mockStartLoginEmailPassword = jest.fn();


jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSingIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginEmailPassword({ email, password }); 
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },//preloadedState para generar un estado previo a la ejecucion del store
    preloadedState: {
        auth: notAuthenticatedState
    }
})


describe('pruebas en <LoginPage />', () => { 
    
    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el componenete correctamente', () => { 
        
        render(
            <Provider store={ store }>
               <MemoryRouter>
                    <LoginPage /> 
               </MemoryRouter>
            </Provider>            
        );

        //screen.debug();
        expect( screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);

     });

    
    test('boton de google debe llamar el startGoogleSingIn', () => { 
        
        render(
            <Provider store={ store }>
               <MemoryRouter>
                    <LoginPage /> 
               </MemoryRouter>               
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);
        expect( mockStartGoogleSingIn ).toHaveBeenCalled();     
    });

    test('submit debe de llamar startLoginWithEmailPassword', () => { 
        
        const email = 'email@google.com';
        const password = '123456';
        
        render(
            <Provider store={ store }>
               <MemoryRouter>
                    <LoginPage /> 
               </MemoryRouter>               
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'correo'});
        fireEvent.change( emailField, { target: { name: 'email', value: email }});

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password }});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password
        })
     });
 });