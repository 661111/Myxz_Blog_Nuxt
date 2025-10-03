<script setup lang="ts">
import { ButtonToggle } from '../buttomToggle';
</script>
<template>
    <div class="nav-button" v-for="button in ButtonToggle" :key="button.id_name" :id="button.id_name">
        <a href="javascript:void(0);" :onclick="button.oclink">
            <span class="iconify i-ph:monitor-bold" aria-hidden="true" style="" data-v-1d2fac5b=""></span>
        </a>
    </div>
</template>