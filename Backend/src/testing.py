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