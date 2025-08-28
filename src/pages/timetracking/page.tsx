
import { useState, useEffect, type SetStateAction } from 'react';
import { motion } from 'framer-motion';

import CheckInCard from './components/CheckInCard';
import TimeTracking from './components/TimeTracking';
import TeamPresence from './components/TeamPresence';
import toast from 'react-hot-toast';
import { api } from '../../store/authStore';
import { getUserId, getToken } from '../../utils/auth';
import type { User, TimeEntry } from '../../types';
import { getIsTartedStorage, getTimeId, getTimeStorage, setIsTartedStorage, setTimeId, setTimeStorage } from '../../localstorage/timeStorage';

export default function TimeTrackingPage() {
  const [user, setUser] = useState<User>()
  const [timeEntries, setTimeEntries] = useState<TimeEntry>()
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);  
  const [todaysEntry, setTodaysEntry] = useState<TimeEntry>();
  const [timeEntry, setTimeEntry] = useState<TimeEntry>()
  const [timeInt, setTimeInt] = useState<Date>()
  const userId = getUserId()

// selection de l'utilisateur 
  useEffect(() => {
    api.get(`/post/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
      }
    }).then(res => {
      setUser(res.data.user)
    })
  }, [])

// initialisation des times et creation de l'element
  const checkIn = () => {
    const nows = new Date()
    setTimeInt(nows)
    setTimeStorage({ h: nows.getHours(), m: nows.getMinutes(), s: nows.getSeconds() })
    const timeEntryInit = { ...timeEntry, userId: userId, id: null }

    api.post('post/api/createTimeEntry', timeEntryInit, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
      }
    }).then(res => {
      if (res.status == 201) {
        console.log(res.data)
        setTimeEntry(res.data)
        setTimeId(res.data.id)
      } else {
        console.log('fou le camp')
      }

    })
    }
// mise a jour de la table a la sortie
  const checkOut = () => {
    const now = new Date()
    const minutes =  (now.getTime() - (timeInt!.getTime())) / (1000 * 60)
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const timeEntryEnd = { ...timeEntry, checkOut: now.toISOString(), duration: `${h}.${m.toString().padStart(2, "0")}` }
    const timeId = getTimeId()
    console.log(timeId)
    api.put(`post/api/updateTimeEntry/${timeId}`, timeEntryEnd, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
      }
    }).then(res => {
      // set de l'element avec c'est mise a jour
      setTimeEntry(res.data.TimeEntry)
    })
  }

// compte de l'heure actuel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
// selection  de tous les pointage d'heure 
// prendre l'etat de ischeckedIn dans le storage a chaque fois que ca change

// recuperer l'etat de ischeckedIn lors du dernier changement et le passer a ischeckIn au refresh
  useEffect(() => {
    const isTarted = getIsTartedStorage()
    const parsed = isTarted === "true"
    setIsCheckedIn(parsed)
    if (parsed) {
      const nows = new Date()
      setTimeInt(nows)
    } 
  // recuperer le temps d'arrivee a chaque refresh
     getTimeStorage()
  }, [])

  // lorsqu'on clique sur arrivée
  const handleCheckIn = () => {
    if (user) {
      // init le TimeEntry
      checkIn();
      // recuperer l'etat selection
      setIsCheckedIn(true);
      toast.success('Pointage d\'arrivée enregistré !', {
        icon: '⏰',
      });
      setIsTartedStorage(true)
    }
  };

// lorsqu'on clique sur sortie
  const handleCheckOut = () => {
    if (user) {
      // conclure 
      checkOut();
      // recuperer l'etat de selection
      setIsCheckedIn(false);
      toast.success('Pointage de départ enregistré !', {
        icon: '🏠',
      });
      setIsTartedStorage(false)
    }
  };

      
      

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {user?.role === 'agent' ? 'Mon pointage' : 'Gestion des présences'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Suivi du temps de travail et des présences
          </p>
        </div>

        {/* Current Time Display */}
        <div className="text-right">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {currentTime.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentTime.toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      </motion.div>

      {/* Check In/Out Card */}
      <CheckInCard
        isCheckedIn={isCheckedIn}
        todaysEntry={timeEntry}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
      />

      <div className={`grid grid-cols-1 ${(user?.role === 'admin' || user?.role === 'rh') ?' lg:grid-cols-2':'lg:grid-cols-1' } gap-8`}>
        {/* Personal Time Tracking */}
        <TimeTracking userId={user?.id} />

        {/* Team Presence (Admin/RH only) */}
        {(user?.role === 'admin' || user?.role === 'rh') && (
          <TeamPresence />
        )}
      </div>
    </div>
  );
}
