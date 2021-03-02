<script>
  import { onMount } from 'svelte';
  import VoiceVerification from './VoiceVerification.svelte';

  export let biometricType;
  export let callType;
  export let doLiveness;
  let modalProblem = false;
  let modalProblemMessage = '';

	onMount(async () => {
    if (biometricType !== 'voice' && biometricType !== 'face' && biometricType !== 'video') {
      modalProblem = true;
      modalProblemMessage = 'biometricType must be of type "voice", "face", or "video".'
      return;
    }

    if (callType !== 'enrollment' && callType !== 'verification') {
      modalProblem = true;
      modalProblemMessage = 'callType must be of type "enrollment" or "verification".'
      return
    }

    if (doLiveness === undefined || typeof doLiveness !== 'boolean') {
      modalProblem = true;
      modalProblemMessage = 'Please pass prop "doLiveness" of type boolean.'
      return
    }

	});

</script>


{#if !modalProblem}

  {#if biometricType === 'voice' && callType === 'verification'}
    <VoiceVerification />
  {:else}
    <h1>The following combination has not been implemented yet</h1>
    <p>biometricType: {biometricType}</p>
    <p>callType: {callType}</p>
    <p>doLiveness: {doLiveness}</p>
  {/if}

{:else}
  <h1>Modal had problem</h1>
  <p>{modalProblemMessage}</p>
{/if}

<style>
 p {
   color: red;
 }
</style>
