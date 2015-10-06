Feature: Slack Http Client

  Scenario: Save channels list
    When I save "channels.list"

  Scenario: Save the info for each channel
    When I save "channels.info" with options:
      | channel | C045YSXTK |

  Scenario: Save users list
    When I save "users.list"

  # adds "presence": "active" or "presence": "away" property to each user in the list
  Scenario: Save present users list
    When I save "users.list" with options:
      | presence | true |

  Scenario: Save user info a user
    When I save "users.info" with options:
      | user | U047X00QG |

  Scenario: Save team info
    When I save "team.info"

  Scenario: Save rtm.start (full payload)
    When I save "rtm.start"

  Scenario: Save rtm.start w/ simple_latest=1
    When I save "rtm.start" with options:
      | simple_latest | 1 |

  Scenario: Save rtm.start w/ no_unreads=1
    When I save "rtm.start" with options:
      | no_unreads | 1 |

  Scenario: Save rtm.start w/ no_unreads=1 and simple_latest=1
    When I save "rtm.start" with options:
      | simple_latest | 1 |
      | no_unreads    | 1 |

  Scenario: Save channel history for all channels
    When I save channel history for all channels
