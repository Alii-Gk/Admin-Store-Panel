import { jwtDecode } from "jwt-decode";

function hiddens(token) {
        try {
          const hidden = jwtDecode(token);
          return hidden;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
      

export default hiddens