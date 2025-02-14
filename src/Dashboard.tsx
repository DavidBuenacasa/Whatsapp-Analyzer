/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from 'react-router-dom'

const Dashboard: React.FC = () => {

    const location = useLocation();
    const data = location.state;
    console.log(data);
    return (
        <div>
            <h2>Dashboard</h2>
            <p>{data}</p>
        </div>
    );
  };
  
  export default Dashboard;