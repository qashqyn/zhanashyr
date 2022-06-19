package com.project.demo.services;

import com.project.demo.entities.Donations;
import com.project.demo.repos.DonationsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationsService {

    @Autowired
    private DonationsRepo donationsRepo;

    public List<Donations> listAll(){
        return donationsRepo.findAll();
    }

    public Donations findDonationById(Long id){
        return donationsRepo.findById(id).orElse(null);
    }

    public void addDonation(Donations donation){
        donationsRepo.save(donation);
    }

    public List<Donations> getAllByUserId(Long userId){
        return donationsRepo.findAllByUserId(userId);
    }

    public List<Donations> getAllByFondId(Long fondId){
        return donationsRepo.findAllByFondId(fondId);
    }

    public List<Donations> getAllByEventId(Long eventId){
        return donationsRepo.findAllByEventId(eventId);
    }
}
