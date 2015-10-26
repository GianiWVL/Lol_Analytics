/**
 * Created by StuxGeek on 25/10/15.
 */
var api_key = "bc3f5380-064e-469d-a402-964428db452a";
var url_Summoner_by_name = "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/";
var url_Match_History = "https://euw.api.pvp.net/api/lol/euw/v2.2/matchlist/by-summoner/";
var summonerId;

var SummonerName = "";

$(document).ready(function(){
    $(".searchSummoner").click(getSummonerInfo);
});

var getSummonerInfo = function(){
    $(".profileIcon").empty();
    $(".summonerInfo").empty();

    SummonerName = $("#summoner").val().toLowerCase();

    $.ajax({
        dataType: "json",
        url: url_Summoner_by_name + SummonerName + "?api_key=" + api_key,
        success: fillSummonerInfo,
        error: reportError
    })
};

var fillSummonerInfo = function(data){
    summonerId = data[SummonerName].id;

    $(".profileIcon").append("<img src='http://ddragon.leagueoflegends.com/cdn/5.20.1/img/profileicon/" + data[SummonerName].profileIconId + ".png' />");
    $(".summonerInfo").append("<p>Summoners Name: " + data[SummonerName].name + "</p>");
    $(".summonerInfo").append("<p>Summoner Level: " + data[SummonerName].summonerLevel + "</p>");

    getMatchHistory();
};

var getMatchHistory = function(){
    $.ajax({
        dataType: "json",
        url: url_Match_History + summonerId + "?api_key=" + api_key,
        success: fillMatchHistory,
        error: reportError
    })
};

var fillMatchHistory = function(data){
    console.log(data);

    $.each(data.matches, function(key, index){
        $(".matchHistory").append("<hr />");
        $(".matchHistory").append("<p>" + data.matches[key].champion + "</p>");
        $(".matchHistory").append("<hr />");
    });




};

var reportError = function(xhr, ajax,error){
    alert("Error: " + error);
};