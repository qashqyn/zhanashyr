package com.project.demo.controllers;

import com.project.demo.entities.Event;
import com.project.demo.services.EventService;
import com.project.demo.services.FondService;
import com.project.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api")
@CrossOrigin
public class EventController {

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @Autowired
    private FondService fondService;

    @GetMapping(value = "/events")
    public ResponseEntity<List<Event>> getAllEvents(){
        List<Event> events = eventService.listAll();
        return new ResponseEntity(events, HttpStatus.OK);
    }

    @GetMapping(value = "/events/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable(name = "eventId") Long id){
        Event event = eventService.findEventById(id);
        return new ResponseEntity<Event>(event, HttpStatus.OK);
    }

    @GetMapping(value = "/events/user/{userId}")
    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable(name = "userId") Long userId){
        List<Event> events = eventService.listAllByUserId(userId);
        return new ResponseEntity(events, HttpStatus.OK);
    }

    @GetMapping(value = "/events/fond/{fondId}")
    public ResponseEntity<List<Event>> getEventsByFondId(@PathVariable(name = "fondId") Long fondId){
        List<Event> events = eventService.listAllByFondId(fondId);
        return new ResponseEntity(events, HttpStatus.OK);
    }

    @PostMapping(value = "/events/add-event")
    public ResponseEntity<String> toAddEvent(@RequestBody Event event,
                                             @RequestParam(name = "fondId") Long fondId,
                                             @RequestParam(name = "userId") Long userId){
        event.setFond(fondService.findFondById(fondId));
        event.setUser(userService.getUserById(userId));
        eventService.addEvent(event);
        return new ResponseEntity<>("EVENT ADDED", HttpStatus.OK);
    }

    @PostMapping(value = "/events/{eventId}/update-event")
    public ResponseEntity<String> toUpdateEvent(@RequestBody Event event){
        eventService.updateEvent(event);
        return new ResponseEntity<>("EVENT UPDATED", HttpStatus.OK);
    }

    @PostMapping(value = "events/delete-event")
    public ResponseEntity<String> toDeleteEvent(@PathVariable(name = "eventId") Long id){
        eventService.deleteEvent(id);
        return new ResponseEntity<>("EVENT DELETED", HttpStatus.OK);
    }
}