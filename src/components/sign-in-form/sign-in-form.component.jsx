import { useState } from 'react';
import { createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss'

const deafultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(deafultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    return (
        <div className='sign-in-container'>
            <h1>I already have an account</h1>
            <span>Sign in with your email and password</span>
            <form onSubmit={() => {}}>
                <FormInput label='Email' inputProps={{type: 'email', required: true, onChange: handleChange, name: 'email', value: email}}/>
                <FormInput label='Password' inputProps={{type: 'password', required: true, onChange: handleChange, name: 'password', value: password}}/>

                <div className='buttons-container'>
                    <Button type='submit'>Sign in</Button>
                    <Button buttonType='google' type='submit' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;