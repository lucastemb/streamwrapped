import pytest
import requests
import json
@pytest.mark.parametrize("user_id,app_id,expected_status,expected_resp", [
    #invalid user, valid game
    ("xXenergizer_batteries_receptacleXx","400013",500,""),
     ("xXenergizer_batteries_receptacleXx","-1",500,""),
    #valid user, valid game
    ("76561198941602532","1245620",200,'''
        {
  "playerstats": {
    "achievements": [
      {
        "achieved": 0,
        "apiname": "ACH00",
        "description": "Obtained all achievements",
        "name": "Elden Ring",
        "unlocktime": 0
      },
      {
        "achieved": 1,
        "apiname": "ACH01",
        "description": "",
        "name": "Elden Lord",
        "unlocktime": 1730214493
      },
      {
        "achieved": 1,
        "apiname": "ACH02",
        "description": "",
        "name": "Age of the Stars",
        "unlocktime": 1727259921
      },
      {
        "achieved": 0,
        "apiname": "ACH03",
        "description": "",
        "name": "Lord of Frenzied Flame",
        "unlocktime": 0
      },
      {
        "achieved": 1,
        "apiname": "ACH04",
        "description": "",
        "name": "Shardbearer Godrick",
        "unlocktime": 1719590427
      },
      {
        "achieved": 1,
        "apiname": "ACH05",
        "description": "",
        "name": "Shardbearer Radahn",
        "unlocktime": 1719702852
      },
      {
        "achieved": 1,
        "apiname": "ACH06",
        "description": "",
        "name": "Shardbearer Morgott",
        "unlocktime": 1720288772
      },
      {
        "achieved": 1,
        "apiname": "ACH07",
        "description": "",
        "name": "Shardbearer Rykard",
        "unlocktime": 1720353275
      },
      {
        "achieved": 1,
        "apiname": "ACH08",
        "description": "",
        "name": "Shardbearer Malenia",
        "unlocktime": 1730049828
      },
      {
        "achieved": 1,
        "apiname": "ACH09",
        "description": "",
        "name": "Shardbearer Mohg",
        "unlocktime": 1720361592
      },
      {
        "achieved": 1,
        "apiname": "ACH10",
        "description": "",
        "name": "Maliketh the Black Blade",
        "unlocktime": 1720362935
      },
      {
        "achieved": 1,
        "apiname": "ACH11",
        "description": "",
        "name": "Hoarah Loux, Warrior",
        "unlocktime": 1720439773
      },
      {
        "achieved": 1,
        "apiname": "ACH12",
        "description": "",
        "name": "Dragonlord Placidusax",
        "unlocktime": 1721136648
      },
      {
        "achieved": 1,
        "apiname": "ACH13",
        "description": "Upgraded any armament to its highest stage",
        "name": "God-Slaying Armament",
        "unlocktime": 1720359020
      },
      {
        "achieved": 1,
        "apiname": "ACH14",
        "description": "Acquired all legendary armaments",
        "name": "Legendary Armaments",
        "unlocktime": 1729946270
      },
      {
        "achieved": 1,
        "apiname": "ACH15",
        "description": "Acquired all legendary ashen remains",
        "name": "Legendary Ashen Remains",
        "unlocktime": 1730047719
      },
      {
        "achieved": 1,
        "apiname": "ACH16",
        "description": "Acquired all legendary sorceries and incantations",
        "name": "Legendary Sorceries and Incantations",
        "unlocktime": 1729957504
      },
      {
        "achieved": 1,
        "apiname": "ACH17",
        "description": "Acquired all legendary talismans",
        "name": "Legendary Talismans",
        "unlocktime": 1730047195
      },
      {
        "achieved": 1,
        "apiname": "ACH18",
        "description": "",
        "name": "Rennala, Queen of the Full Moon",
        "unlocktime": 1719663457
      },
      {
        "achieved": 1,
        "apiname": "ACH19",
        "description": "",
        "name": "Lichdragon Fortissax",
        "unlocktime": 1720442894
      },
      {
        "achieved": 1,
        "apiname": "ACH20",
        "description": "",
        "name": "Godskin Duo",
        "unlocktime": 1720347551
      },
      {
        "achieved": 1,
        "apiname": "ACH21",
        "description": "",
        "name": "Fire Giant",
        "unlocktime": 1720308418
      },
      {
        "achieved": 1,
        "apiname": "ACH22",
        "description": "",
        "name": "Dragonkin Soldier of Nokstella",
        "unlocktime": 1727258737
      },
      {
        "achieved": 1,
        "apiname": "ACH23",
        "description": "",
        "name": "Regal Ancestor Spirit",
        "unlocktime": 1719704685
      },
      {
        "achieved": 1,
        "apiname": "ACH24",
        "description": "",
        "name": "Valiant Gargoyles",
        "unlocktime": 1720440590
      },
      {
        "achieved": 1,
        "apiname": "ACH25",
        "description": "",
        "name": "Margit, the Fell Omen",
        "unlocktime": 1719523781
      },
      {
        "achieved": 1,
        "apiname": "ACH26",
        "description": "",
        "name": "Red Wolf of Radagon",
        "unlocktime": 1719661463
      },
      {
        "achieved": 1,
        "apiname": "ACH27",
        "description": "",
        "name": "Godskin Noble",
        "unlocktime": 1729343210
      },
      {
        "achieved": 1,
        "apiname": "ACH28",
        "description": "",
        "name": "Magma Wyrm Makar",
        "unlocktime": 1727259363
      },
      {
        "achieved": 1,
        "apiname": "ACH29",
        "description": "",
        "name": "Godfrey, First Elden Lord",
        "unlocktime": 1720212128
      },
      {
        "achieved": 1,
        "apiname": "ACH30",
        "description": "",
        "name": "Mohg, the Omen",
        "unlocktime": 1721500854
      },
      {
        "achieved": 1,
        "apiname": "ACH31",
        "description": "",
        "name": "Mimic Tear",
        "unlocktime": 1719703415
      },
      {
        "achieved": 1,
        "apiname": "ACH32",
        "description": "",
        "name": "Loretta, Knight of the Haligtree",
        "unlocktime": 1720817194
      },
      {
        "achieved": 1,
        "apiname": "ACH33",
        "description": "",
        "name": "Astel, Naturalborn of the Void",
        "unlocktime": 1720358030
      },
      {
        "achieved": 1,
        "apiname": "ACH34",
        "description": "",
        "name": "Leonine Misbegotten",
        "unlocktime": 1719605593
      },
      {
        "achieved": 1,
        "apiname": "ACH35",
        "description": "",
        "name": "Royal Knight Loretta",
        "unlocktime": 1719667356
      },
      {
        "achieved": 1,
        "apiname": "ACH36",
        "description": "",
        "name": "Elemer of the Briar",
        "unlocktime": 1720301957
      },
      {
        "achieved": 1,
        "apiname": "ACH37",
        "description": "",
        "name": "Ancestor Spirit",
        "unlocktime": 1719691433
      },
      {
        "achieved": 1,
        "apiname": "ACH38",
        "description": "",
        "name": "Commander Niall",
        "unlocktime": 1720433198
      },
      {
        "achieved": 1,
        "apiname": "ACH39",
        "description": "",
        "name": "Roundtable Hold",
        "unlocktime": 1719519509
      },
      {
        "achieved": 1,
        "apiname": "ACH40",
        "description": "",
        "name": "Great Rune",
        "unlocktime": 1719590700
      },
      {
        "achieved": 1,
        "apiname": "ACH41",
        "description": "",
        "name": "Erdtree Aflame",
        "unlocktime": 1720308475
      }
    ],
    "gameName": "ELDEN RING",
    "steamID": "76561198941602532",
    "success": true
  }
}
'''),
    #valid user, game not owned
    ("76561198941602532","645390",500,""),
    #valid user, invalid game
    ("76561198941602532","-1",500,""),

])
def test_get_achievements(user_id,app_id,expected_status,expected_resp):
    response = requests.get(f"http://127.0.0.1:8000/get-achievements/{user_id}/{app_id}")
    #print(response.json())
    assert response.status_code == expected_status
    if(response.status_code==200):
        assert response.json() == json.loads(expected_resp)
