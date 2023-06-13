import React from "react";
import moment from 'moment-timezone'

export const dateGlobal = (tgl) => {
    const dateObj = moment(tgl).tz('Asia/Jakarta');
    const now = moment();
    const diffSeconds = now.diff(dateObj, 'seconds');
    const diffMinutes = now.diff(dateObj, 'minutes');
    const diffHours = now.diff(dateObj, 'hours');
    const diffDays = now.diff(dateObj, 'days');
    const diffMonths = now.diff(dateObj, 'months');
    const diffYears = now.diff(dateObj, 'years');
    
    if (diffSeconds < 60) {
      return diffSeconds + ' detik yang lalu';
    } else if (diffMinutes < 60) {
      return diffMinutes + ' menit yang lalu';
    } else if (diffHours < 24) {
      return diffHours + ' jam yang lalu';
    } else if (diffDays < 31) {
      return diffDays + ' hari yang lalu';
    } else if(diffMonths < 12){
      return diffMonths + ' bulan yang lalu';
    }else if(diffYears === 0){
      return 'setahun yang lalu';
    }else{
      return diffYears + ' tahun yang lalu' 
    }
  }

  export const dateGlobalById = (tgl) => {
    const dateObj = moment(tgl).tz('Asia/Jakarta');
    const now = moment();
    const diffSeconds = now.diff(dateObj, 'seconds');
    const diffMinutes = now.diff(dateObj, 'minutes');
    const diffHours = now.diff(dateObj, 'hours');
    const diffDays = now.diff(dateObj, 'days');
    const diffMonths = now.diff(dateObj, 'months');
    const diffYears = now.diff(dateObj, 'years');
    
    if (diffSeconds < 60) {
      return diffSeconds + ' detik';
    } else if (diffMinutes < 60) {
      return diffMinutes + ' menit';
    } else if (diffHours < 24) {
      return diffHours + ' jam';
    } else if (diffDays < 31) {
      return diffDays + ' hari';
    } else if(diffMonths < 12){
      return diffMonths + ' bulan';
    }else if(diffYears === 0){
      return 'setahun yang lalu';
    }else{
      return diffYears + ' tahun' 
    }
  }

  export const dateGlobalComments = (tgl) => {
    const dateObj = moment(tgl).tz('Asia/Jakarta');
    const now = moment();
    const diffSeconds = now.diff(dateObj, 'seconds');
    const diffMinutes = now.diff(dateObj, 'minutes');
    const diffHours = now.diff(dateObj, 'hours');
    const diffDays = now.diff(dateObj, 'days');
    const diffMonths = now.diff(dateObj, 'months');
    const diffYears = now.diff(dateObj, 'years');
    
    if (diffSeconds < 60) {
      return diffSeconds + ' detik';
    } else if (diffMinutes < 60) {
      return diffMinutes + ' menit';
    } else if (diffHours < 24) {
      return diffHours + ' jam';
    } else if (diffDays < 31) {
      return diffDays + ' hari';
    } else if(diffMonths < 12){
      return diffMonths + ' bulan';
    }else if(diffYears === 0){
      return 'setahun yang lalu';
    }else{
      return diffYears + ' tahun' 
    }
  }