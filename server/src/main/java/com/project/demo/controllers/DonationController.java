package com.project.demo.controllers;

import com.project.demo.entities.Donations;
import com.project.demo.services.DonationsService;
import com.project.demo.services.EventService;
import com.project.demo.services.FondService;
import com.project.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin
public class DonationController {

    @Autowired
    private DonationsService donationsService;

    @Autowired
    private UserService userService;

    @Autowired
    private FondService fondService;

    @Autowired
    private EventService eventService;

    @GetMapping(value = "/donations")
    public ResponseEntity<List<Donations>> getAllDonations(){
        List<Donations> donations = donationsService.listAll();
        return new ResponseEntity(donations, HttpStatus.OK);
    }

    @GetMapping(value = "/donations/{donationId}")
    public ResponseEntity<Donations> getDonationById(@PathVariable(name = "donationId") Long donationId){
        Donations donation = donationsService.findDonationById(donationId);
        return new ResponseEntity(donation, HttpStatus.OK);
    }

    @GetMapping(value = "/donations/user/{userId}")
    public ResponseEntity<List<Donations>> getDonationsByUserId(@PathVariable(name = "userId") Long userId){
        List<Donations> donations = donationsService.getAllByUserId(userId);
        return new ResponseEntity(donations, HttpStatus.OK);
    }

    @GetMapping(value = "/donations/fond/{fondId}")
    public ResponseEntity<List<Donations>> getDonationsByFondId(@PathVariable(name = "fondId") Long fondId){
        List<Donations> donations = donationsService.getAllByFondId(fondId);
        return new ResponseEntity(donations, HttpStatus.OK);
    }

    @GetMapping(value = "/donations/event/{eventId}")
    public ResponseEntity<List<Donations>> getDonationsByEventId(@PathVariable(name = "eventId") Long eventId){
        List<Donations> donations = donationsService.getAllByEventId(eventId);
        return new ResponseEntity(donations, HttpStatus.OK);
    }

    @PostMapping(value = "/donations/add-donation")
    public ResponseEntity<String> toAddDonation(@RequestBody Donations donation,
                                                @RequestParam(name = "fondId") Long fondId,
                                                @RequestParam(name = "userId", required = false) Long userId,
                                                @RequestParam(name = "eventId", required = false) Long eventId){
        if(userId != null){
            donation.setUser(userService.getUserById(userId));
        }
        if(eventId != null){
            donation.setEvent(eventService.findEventById(eventId));
        }
        if(fondId != null){
            donation.setFond(fondService.findFondById(fondId));
        }
        else{
            return new ResponseEntity("ERROR", HttpStatus.BAD_REQUEST);
        }
        donationsService.addDonation(donation);
        return new ResponseEntity("DONATION ADDED", HttpStatus.OK);
    }
}