<script>
  import { onMount } from 'svelte';

  export let biometricType;
  export let callType;
  export let doLiveness;
  let modalProblem = false;
  let modalProblemMessage = '';

	onMount(async () => {
		// const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		// photos = await res.json();
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


{#if modalProblem}
  <p>{modalProblemMessage}</p>
{:else}
  <div>
    <p>biometricType: {biometricType}</p>
    <p>callType: {callType}</p>
    <p>doLiveness: {doLiveness}</p>
  </div>

  <div class="viModal ui modal transition visible active" style="max-width: 460px; min-width: 460px; overflow: hidden; margin-bottom: 8%; background: transparent;">
     <i class="close icon" style="top: 1rem; right: 1rem; color: rgb(255, 255, 255); font-size: 25px;"></i>
     <div class="ui card" style="z-index: -2;">
        <div class="image">
           <div style="display: none; width: 100%; height: 345px; position: absolute; z-index: 26; background: black; text-align: center; align-items: center; place-content: center; flex-wrap: wrap;">
              <span class="ui header" style="color: white; font-style: normal; padding-top: 5rem; padding-left: 10px; padding-right: 10px; font-size: large; width: 100%; font-weight: 300;">Reenrollment will delete all previous voice, face, and video enrollments.
              Proceed?</span>
              <div>
                 <i class="ic icon arrow circle left arrowButton"></i>
                 <i class="ic icons icon arrow circle right arrowButton">
                 </i>
              </div>
           </div>
           <div style="display: none; width: 100%; height: 345px; position: absolute; z-index: 26; background: black; text-align: center; align-items: center; place-content: center; flex-wrap: wrap;">
              <h4 style="margin-bottom: 7%; font-weight: normal; max-width: 80%; color: white; font-style: normal;">Please move closer to the camera. You'll be performing a predetermined number of liveness challenges. A few examples of the challenges could be the following:</h4>
              <img src="" style="width: 70%;">
              <a class="ui basic label" style="color: rgb(0, 0, 0); position: absolute; bottom: 0px;">Skip</a>
           </div>
           <div style="position: relative; justify-content: center; display: flex; min-height: 365px; width: 100%;">
              <div style="display: flex; position: absolute; min-height: 345px; width: 100%; z-index: 1; background: rgba(0, 0, 0, 0.5); opacity: 1;"></div>
              <canvas width="460" height="345" class="viCanvas" style="position: absolute; top: 6%; z-index: 2;"></canvas>
              <button class="small ui inverted basic button viReadyButton" style="position: absolute; bottom: 0%; z-index: 8; margin: auto; font-weight: 600; display: inline-block; opacity: 1;">Click to begin<i class="chevron circle right icon"></i></button>
              <canvas class="viImageCanvas" height="480" width="640" style="top: 6%; width: 100%; position: absolute; opacity: 1;"></canvas>
           </div>
           <video id="videoLiveness" autoplay="" playsinline=""></video>
        </div>
        <div class="content" style="bottom: 3.5em; z-index: 6; position: relative; padding: 0px; background-color: black; text-align: center;">
           <a class="ui header" style="color: rgb(46, 204, 113); height: 2em;">
           <span style="font-style: normal; max-width: 300px; color: rgb(255, 255, 255);"></span>
           </a>
        </div>
        <div class="extra content" style="background-color: rgb(0, 0, 0);">
           <a href="https://voiceit.io" target="_blank"><img id="powered-by" src="">
           </a>
        </div>
     </div>
  </div>
{/if}

<style>
 p {
   color: red;
 }
</style>
