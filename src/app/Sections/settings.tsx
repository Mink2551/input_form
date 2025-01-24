import React, {useState , useEffect} from 'react'

interface User {
    name: string;
    surname: string;
    studentID: number;
    introductionSelf: string;
    ratedSelf: number;
    level: string;
    classRoom: string;
    status: string;
  }

function settings() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [users, setUsers] = useState<User[]>([]);

    const getUsers = async () => {
      try {
        const res = await fetch('/api/users', {
          cache: 'no-store',
          method: 'GET',
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    useEffect(() => {
      getUsers();
    }, []);
    
    useEffect(() => {
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default settings
