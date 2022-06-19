package com.project.demo.services;

import com.project.demo.entities.Fond;
import com.project.demo.repos.FondsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class FondService {

    @Autowired
    private FondsRepo fondsRepo;

    public List<Fond> listAll(String search, String location, String category) {
        List<String> locations = Arrays.asList("Алматы", "Нұр-Сұлтан", "Шымкент", "Ақтөбе", "Қарағанды", "Тараз", "Павлодап", "Семей", "Өскемен", "Қызылорда", "Орал", "Қостанай", "Атырау", "Петропавл", "Ақтау", "Көкшетау", "Талдықорған");

        if(location != null && location.length() > 0){
            locations = Collections.singletonList(location);
        }
        List<Fond> fonds = fondsRepo.searchNew(search, locations);

        if(category != null && category.length() > 0){
            List<String> categories = new ArrayList<>(Arrays.asList(category.split(",")));
            List<Fond> newFonds = new ArrayList<Fond>();

            for (Fond fond:fonds) {
                List<String> fondCategories = new ArrayList<>(Arrays.asList(fond.getCategory().split(",")));
                if(fondCategories.stream().anyMatch(element -> categories.contains(element))){
                    newFonds.add((fond));
                }
            }
            return newFonds;
        }

        return fonds;
    }

    public Fond findFondById(Long id){
        return fondsRepo.findById(id).orElse(null);
    }

    public void addFond(Fond fond){
        fondsRepo.save(fond);
    }

    public void updateFond(Fond fond){
        fondsRepo.save(fond);
    }

    public void deleteFond(Long id){
        fondsRepo.deleteById(id);
    }
}
