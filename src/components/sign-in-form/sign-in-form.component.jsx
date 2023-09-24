import { useState, useContext } from 'react';
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss'
import { UserContext, useCurrentUser } from '../../contexts/user.context'

const deafultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(deafultFormFields);
    const { email, password } = formFields;

    // const { setCurrentUser  } = useContext(UserContext); //destructuring
    const { setCurrentUser } = useCurrentUser()

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        setCurrentUser(user);
        await createUserDocumentFromAuth(user);
    };

    const resetFormFields = () => {
        setFormFields(deafultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            //we must store the user object inside the context
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);

            resetFormFields();
        } catch(error) {

            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password!');
                    break
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default: console.log(error);

            }
        };
    };

    return (
        <div className='sign-in-container'>
            <h1>I already have an account</h1>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' inputProps={{type: 'email', required: true, onChange: handleChange, name: 'email', value: email}}/>
                <FormInput label='Password' inputProps={{type: 'password', required: true, onChange: handleChange, name: 'password', value: password}}/>

                <div className='buttons-container'>
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;