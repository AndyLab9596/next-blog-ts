import React, { SyntheticEvent, useEffect, useState } from 'react'
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const ContactForm = () => {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState<'pending' | 'success' | 'error' | undefined>(); // 'pending' 'success' 'error'
    const [requestError, setRequestError] = useState('');

    const sendMessageHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setRequestStatus('pending')
        try {
            const response = await fetch(`/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: enteredEmail,
                    name: enteredName,
                    message: enteredMessage
                })
            })

            const data = await response.json();
            setRequestStatus('success')

            if (!response.ok) {
                setRequestStatus('error')
                throw new Error(data.message || 'Something went wrong !');
            }

        } catch (error: any) {
            setRequestError(error.message);
            setRequestStatus('error')
            console.log(error);
        } finally {
            setRequestStatus(undefined)
        }
    }


    let notification: {
        status: 'pending' | 'error' | 'success';
        title: string;
        message: string;
    } | undefined = undefined;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message....',
            message: 'Your message is on its way'
        };
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully'
        };
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error',
            message: requestError as string
        }
    }

    useEffect(() => {
        if (requestStatus === 'pending' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(undefined)
                setRequestError('');
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [requestStatus])


    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id='email'
                            required
                            value={enteredEmail}
                            onChange={event => setEnteredEmail(event.target.value)}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id='name'
                            required
                            value={enteredName}
                            onChange={event => setEnteredName(event.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        rows={5}
                        value={enteredMessage}
                        onChange={event => setEnteredMessage(event.target.value)}
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {!!notification && !!requestStatus && <Notification
                status={notification.status}
                title={notification.title}
                message={notification.message}
            />}
        </section>

    )
}

export default ContactForm