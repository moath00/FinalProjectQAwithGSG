Feature: Verify that the user can upload a txt file for Application Initiated and Hired statuses.

    Scenario: Upload a txt file for Application Initiated
        Given The system have employee And job title And vacancy
        And The system have candidate with status "Interview Scheduled"

        When The Admin logged in
        And Access the candidate form and Enable the edit candidate switch
        And Upload a txt file in resume section and save the form
        And Download the resume txt file

        Then Verify the downloaded file content match the uploaded txt file