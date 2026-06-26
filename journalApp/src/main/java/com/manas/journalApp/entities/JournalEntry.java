package com.manas.journalApp.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "journal_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JournalEntry {

    @Id
    // 🏆 THE PIECE THAT FIXES EVERYTHING: Force the ID to serialize as a flat String inside lists!
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @NonNull
    private String title;

    private String content;

    private LocalDateTime date;
}