import { gql } from 'apollo-boost';

const getEventsQuery = gql`
    query {
        events {
            _id
            title
            description
            price
            date 
            creator {
                username
            }
        }
    }
`;

const addEventMutation = gql`
    mutation($title:String!, $description:String!, $price: Float!, $date: String! ) {
        createEvent(eventInput: {
            title:$title,
            description:$description,
            price: $price,
            date: $date
        }) {
            _id
            title
            description
            price
            date 
        }
    }
`;


export { getEventsQuery, addEventMutation };