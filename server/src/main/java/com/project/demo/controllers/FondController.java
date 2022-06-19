package com.project.demo.controllers;

import com.project.demo.entities.Fond;
import com.project.demo.services.FondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api")
@CrossOrigin
public class FondController {

    @Autowired
    private FondService fondService;

    @GetMapping(value = "/fonds")
    public ResponseEntity<List<Fond>> getAllFonds(@RequestParam(name = "search", defaultValue = "", required = false) String search,
                                                  @Param("location") String location,
                                                  @Param("category") String category) {
        List<Fond> fonds = fondService.listAll(search, location, category);
        return new ResponseEntity<>(fonds, HttpStatus.OK);
    }

    @GetMapping(value = "/fonds/{fondId}")
    public ResponseEntity<Fond> getFondById(@PathVariable(name = "fondId") Long id){
        Fond fond = fondService.findFondById(id);
        return new ResponseEntity(fond, HttpStatus.OK);
    }

    @PostMapping(value = "/fonds/add-fond")
    public ResponseEntity<String> toAddFond(@RequestBody Fond fond){
        fondService.addFond(fond);
        return new ResponseEntity<>("FOND ADDED", HttpStatus.OK);
    }

    @PostMapping(value = "/fonds/{fondId}/update-fond")
    public ResponseEntity<String> toUpdateFond(@RequestBody Fond fond){
        fondService.updateFond(fond);
        return new ResponseEntity<>("FOND UPDATED", HttpStatus.OK);
    }

    @PostMapping(value = "/fonds/delete-fond")
    public ResponseEntity<String> toDeleteFond(@RequestParam(name="fondId") Long id){
        fondService.deleteFond(id);
        return new ResponseEntity<>("FOND DELETED", HttpStatus.OK);
    }
}