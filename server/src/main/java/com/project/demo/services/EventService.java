package com.project.demo.services;

import com.project.demo.entities.Event;
import com.project.demo.repos.EventsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventsRepo eventsRepo;

    public List<Event> listAll(){
        return eventsRepo.findAll();
    }

    public Event findEventById(Long id){
        return eventsRepo.findById(id).orElse(null);
    }

    public List<Event> listAllByUserId(Long userId){
        return eventsRepo.findAllByUserId(userId);
    }

    public List<Event> listAllByFondId(Long fondId){
        return eventsRepo.findAllByFondId(fondId);
    }

    public void addEvent(Event event){
        eventsRepo.save(event);
    }

    public void updateEvent(Event event){
        eventsRepo.save(event);
    }

    public void deleteEvent(Long id){
        eventsRepo.deleteById(id);
    }
}
