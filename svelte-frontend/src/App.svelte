<script>
  import Modal from './Modal.svelte';

  export let biometricType;
  export let callType;
  export let doLiveness;
</script>

<Modal biometricType={biometricType} callType={callType} doLiveness={doLiveness} />
