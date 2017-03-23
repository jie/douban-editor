import {
    getDefaultKeyBinding
} from 'draft-js'



function keyBindingFn(e: SyntheticKeyboardEvent): string {
  if (e.keyCode === 13 /* `Enter` key */) {
  	if (e.nativeEvent.shiftKey) {
  	    return 'soft-enter'
  	}
  }
  return getDefaultKeyBinding(e);

}

module.exports = {
    keyBindingFn: keyBindingFn
}
