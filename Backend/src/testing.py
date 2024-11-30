import pytest
import requests
import json

#test 1: get games for account (thechildizard)
def test_get_games():
    response = requests.get("http://127.0.0.1:8000/get-games/76561198109081792")
    test = '''{
    "game_count": 32,
    "games": [
        {
            "appid": 4000,
            "has_community_visible_stats": true,
            "img_icon_url": "4a6f25cfa2426445d0d9d6e233408de4d371ce8b",
            "name": "Garry's Mod",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 7531,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 499,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1584500372
        },
        {
            "appid": 240,
            "content_descriptorids": [
                2,
                5
            ],
            "has_community_visible_stats": true,
            "img_icon_url": "9052fa60c496a1c03383b27687ec50f4bf0f0e10",
            "name": "Counter-Strike: Source",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 151,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 1,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1583549216
        },
        {
            "appid": 7670,
            "img_icon_url": "9a7c9f640a76e6a32592277dbbc36a0f6da05372",
            "name": "BioShock",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 0,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 0
        },
        {
            "appid": 409710,
            "has_community_visible_stats": true,
            "img_icon_url": "eb72262cd3ccc3219dd76392be3b60a4b6cbfd38",
            "name": "BioShock Remastered",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 515,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 515,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1587308118
        },
        {
            "appid": 400,
            "has_community_visible_stats": true,
            "img_icon_url": "cfa928ab4119dd137e50d728e8fe703e4e970aff",
            "name": "Portal",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 36,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1421353867
        },
        {
            "appid": 105600,
            "has_community_visible_stats": true,
            "img_icon_url": "858961e95fbf869f136e1770d586e0caefd4cfac",
            "name": "Terraria",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 124,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 124,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1665025973
        },
        {
            "appid": 206440,
            "has_community_visible_stats": true,
            "img_icon_url": "6e29eb4076a6253fdbccb987a2a21746d2df54d7",
            "name": "To the Moon",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 81,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 76,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1626243002
        },
        {
            "appid": 204360,
            "has_community_visible_stats": true,
            "img_icon_url": "9b7625f9b70f103397fd0416fd92abb583db8659",
            "name": "Castle Crashers",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 335,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 96,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1626333808
        },
        {
            "appid": 224540,
            "has_community_visible_stats": true,
            "img_icon_url": "78082d2c84f67cfb7bd75e9b42c7c412259608bb",
            "name": "Ace of Spades",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 686,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1402437074
        },
        {
            "appid": 226320,
            "has_community_visible_stats": true,
            "img_icon_url": "f9e8431600ea2ac6b15d81bd6c38e63c13ba2bbd",
            "name": "Marvel Heroes Omega",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 0,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 0
        },
        {
            "appid": 233720,
            "has_community_visible_stats": true,
            "img_icon_url": "77e5bb562902be4a5a49b114d7370138696b1595",
            "name": "Surgeon Simulator",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 496,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1411158710
        },
        {
            "appid": 219740,
            "img_icon_url": "03fe647df40dccc4d19bf42a0185cd3e6b9f2953",
            "name": "Don't Starve",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 457,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 413,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1626055001
        },
        {
            "appid": 322330,
            "img_icon_url": "a80aa6cff8eebc1cbc18c367d9ab063e1553b0ee",
            "name": "Don't Starve Together",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 194,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1451091097
        },
        {
            "appid": 239030,
            "content_descriptorids": [
                1,
                5
            ],
            "has_community_visible_stats": true,
            "has_leaderboards": true,
            "img_icon_url": "102e22fc7e0689cb5a9d8cfdd5a6725d571d1a0f",
            "name": "Papers, Please",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 416,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 416,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1626151337
        },
        {
            "appid": 250760,
            "has_community_visible_stats": true,
            "img_icon_url": "a4df2557166453374519b64ed5ccef3f0a643f4e",
            "name": "Shovel Knight: Treasure Trove",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 562,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 562,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1635195144
        },
        {
            "appid": 249130,
            "has_community_visible_stats": true,
            "img_icon_url": "8462ed9e1004624c7109233eafd7098211da9f86",
            "name": "LEGO® MARVEL Super Heroes",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 27,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1416106519
        },
        {
            "appid": 265930,
            "has_community_visible_stats": true,
            "has_leaderboards": true,
            "img_icon_url": "edf6c28b83d5fc221338ff71d01caa11d11d3b50",
            "name": "Goat Simulator",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 100,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1441398360
        },
        {
            "appid": 268910,
            "has_community_visible_stats": true,
            "img_icon_url": "c19f1bd916b6d171e94089d03112ec4e4e4da84e",
            "name": "Cuphead",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 923,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 923,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1656464358
        },
        {
            "appid": 298260,
            "has_community_visible_stats": true,
            "img_icon_url": "f675495531ca6a73ccf1c7e9eae602e139db1787",
            "name": "Only If",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 9,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1419807022
        },
        {
            "appid": 304050,
            "has_community_visible_stats": true,
            "img_icon_url": "76b62601bb6f0551c415697fe92a6653340f4a5e",
            "name": "Trove",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 1,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1465149908
        },
        {
            "appid": 304930,
            "has_community_visible_stats": true,
            "img_icon_url": "e18009fb628b35953826efe47dc3be556b689f4c",
            "name": "Unturned",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 115,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1421291986
        },
        {
            "appid": 319510,
            "img_icon_url": "5da39a273efa65643cf4c12025898da0076dad69",
            "name": "Five Nights at Freddy's",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 7,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1412363738
        },
        {
            "appid": 327890,
            "has_community_visible_stats": true,
            "has_leaderboards": true,
            "img_icon_url": "40b2f1ff3dd97df35c094f4d8e8f2e98b8f75eee",
            "name": "I Am Bread",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 59,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1420068340
        },
        {
            "appid": 730,
            "content_descriptorids": [
                2,
                5
            ],
            "has_community_visible_stats": true,
            "img_icon_url": "8dbc71957312bbd3baea65848b545be9eae2a355",
            "name": "Counter-Strike 2",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 30127,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 271,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1589586522
        },
        {
            "appid": 367520,
            "has_community_visible_stats": true,
            "img_icon_url": "7b87aecda896ae747a6e40e3eb63498cb8b84df2",
            "name": "Hollow Knight",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 0,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 0
        },
        {
            "appid": 376870,
            "has_community_visible_stats": true,
            "img_icon_url": "4b6ddfa303f24008748894ad65b556251d0bd6a8",
            "name": "Minecraft: Story Mode - A Telltale Games Series",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 27,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1451484739
        },
        {
            "appid": 391540,
            "img_icon_url": "2ce672b89b63ec1e70d2f12862e72eb4a33e9268",
            "name": "Undertale",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 806,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 806,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1625859151
        },
        {
            "appid": 407530,
            "img_icon_url": "807c673cddebbfee0700a947a75f4872ad136e9b",
            "name": "ARK: Survival Of The Fittest",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 0,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 0
        },
        {
            "appid": 413150,
            "has_community_visible_stats": true,
            "img_icon_url": "35d1377200084a4034238c05b0c8930451e2fb40",
            "name": "Stardew Valley",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 1899,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 1899,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1685933966
        },
        {
            "appid": 504230,
            "has_community_visible_stats": true,
            "img_icon_url": "04cb7aa0b497a3962e6b1655b7fd81a2cc95d18b",
            "name": "Celeste",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 234,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 234,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1705716163
        },
        {
            "appid": 653530,
            "content_descriptorids": [
                1,
                2,
                5
            ],
            "has_community_visible_stats": true,
            "img_icon_url": "24c6239385563bff1fccad712f27a0c1fe18349b",
            "name": "Return of the Obra Dinn",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 0,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 0
        },
        {
            "appid": 440,
            "has_community_visible_stats": true,
            "has_leaderboards": true,
            "img_icon_url": "e3f595a92552da3d664ad00277fad2107345f743",
            "name": "Team Fortress 2",
            "playtime_deck_forever": 0,
            "playtime_disconnected": 0,
            "playtime_forever": 197,
            "playtime_linux_forever": 0,
            "playtime_mac_forever": 0,
            "playtime_windows_forever": 0,
            "rtime_last_played": 1551043500
        }
    ]
}'''
    

    assert response.status_code == 200 
    assert response.json() == json.loads(test)

def test_get_user_1():
    response = requests.get("http://127.0.0.1:8000/search-user/lucastemb")
    test = '''{
        "player": {
            "avatar": "https://avatars.steamstatic.com/e0d32d3a966354c660410d8d66f14d5b2040fe81.jpg",
            "avatarfull": "https://avatars.steamstatic.com/e0d32d3a966354c660410d8d66f14d5b2040fe81_full.jpg",
            "avatarhash": "e0d32d3a966354c660410d8d66f14d5b2040fe81",
            "avatarmedium": "https://avatars.steamstatic.com/e0d32d3a966354c660410d8d66f14d5b2040fe81_medium.jpg",
            "communityvisibilitystate": 3,
            "lastlogoff": 1730212988,
            "personaname": "lucastemb",
            "personastate": 1,
            "personastateflags": 0,
            "primaryclanid": "103582791438082971",
            "profilestate": 1,
            "profileurl": "https://steamcommunity.com/id/lucastemb/",
            "steamid": "76561198109081792",
            "timecreated": 1380493415
        }
    }'''
    
    assert response.status_code == 200 
    assert response.json() == json.loads(test)

def test_get_user_2():
    response = requests.get("http://127.0.0.1:8000/search-user/Snowballius")
    test = '''{
        "player": {
            "avatar": "https://avatars.steamstatic.com/a5cbd18696d926bda0868c447f329588e68bfb64.jpg",
            "avatarfull": "https://avatars.steamstatic.com/a5cbd18696d926bda0868c447f329588e68bfb64_full.jpg",
            "avatarhash": "a5cbd18696d926bda0868c447f329588e68bfb64",
            "avatarmedium": "https://avatars.steamstatic.com/a5cbd18696d926bda0868c447f329588e68bfb64_medium.jpg",
            "commentpermission": 1,
            "communityvisibilitystate": 3,
            "lastlogoff": 1730244136,
            "loccountrycode": "US",
            "personaname": "Snowballius",
            "personastate": 0,
            "personastateflags": 0,
            "primaryclanid": "103582791438082971",
            "profilestate": 1,
            "profileurl": "https://steamcommunity.com/id/Snowballius/",
            "realname": "Jo-Man",
            "steamid": "76561198113958016",
            "timecreated": 1383944059
        }
    }'''
            
    assert response.status_code == 200 
    assert response.json() == json.loads(test)

def test_get_user_no_id():
    response = requests.get("http://127.0.0.1:8000/search-user/")
            
    assert response.status_code == 404

def test_get_user_nonexistent_id():
    response = requests.get("http://127.0.0.1:8000/search-user/NonexistentUserID")
    test = '''"No match"'''
    assert response.status_code == 200 
    assert response.json() == json.loads(test)
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

# Test for the /get-friends endpoint
def test_get_friends():
    response = requests.get(f"http://127.0.0.1:8000/get-friends/76561198109081792")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)  # Ensure the response is a JSON object
    # Additional checks based on actual API response structure
    if response.status_code == 200 and "error" not in response.json():
        assert "friends" in response.json() or len(response.json()) > 0  # Check for friends data

# Test for the /get-level endpoint
def test_get_level():
    response = requests.get(f"http://127.0.0.1:8000/get-level/76561198109081792")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)  # Ensure the response is a JSON object
    # Additional checks based on actual API response structure
    if response.status_code == 200 and "error" not in response.json():
        assert "level" in response.json() or "player_level" in response.json()  # Check for level data

