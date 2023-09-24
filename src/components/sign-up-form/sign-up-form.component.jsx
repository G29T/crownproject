import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';
import { createUserDocumentFromAuth, createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context'

const deafultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmedPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(deafultFormFields);
    const {displayName, email, password, confirmedPassword} = formFields;

    const { setCurrentUser } = useContext(UserContext);
    // console.log(formFields);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});   // setFormFields({ displayName: '', password: '', confirmedPassord: '', email: 'gabriela@gmail.com' })
    }

    const resetFormFields = () => {
        setFormFields(deafultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmedPassword){
            alert('Passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);
            
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user! Email already in use.');
            }
            console.log('User creation encountered an error', error);
        };
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

            {/* <label>Display Name</label>
            <input type='text' required onChange={handleChange} name='displayName' value={displayName} /> */}

                <FormInput label='Display Name' inputProps={{type: 'text', required: true, onChange: handleChange, name: 'displayName', value: displayName}}/>
                <FormInput label='Email' inputProps={{type: 'email', required: true, onChange: handleChange, name: 'email', value: email}}/>
                <FormInput label='Password' inputProps={{type: 'password', required: true, onChange: handleChange, name: 'password', value: password}}/>
                <FormInput label='Confirm Password' inputProps={{type: 'password', required: true, onChange: handleChange, name: 'confirmedPassword', value: confirmedPassword}}/>

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;