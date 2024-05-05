Feature: Manage candidate status

    Scenario: Change the candidate status from "Interview Scheduled" to "Interview passed"
        Given The system have employee And job title And vacancy
        And The candidate have "Interview Scheduled" status

        When Admin log in
        And Admin change the status to "Interview passed" status

        Then The status should be "Interview passed" when Admin change the status

    Scenario: Change the candidate status from "Interview Scheduled" to "Interview failed"
        Given The system have employee And job title And vacancy
        And The candidate have "Interview Scheduled" status

        When Admin log in
        And Admin change the status to "Interview failed" status

        Then the status should be "Interview failed" when Admin change the status