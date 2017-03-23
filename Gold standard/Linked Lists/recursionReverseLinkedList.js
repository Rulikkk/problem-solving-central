/**
 * Binary search for item in an array. Returns index of some (not necessarily first) item.
 * @param {Object} head - start linked list. Schema: { index: number, next: Object }.
 * @returns {Object} new head reverse linked list.
 */
function reverseList(head) {
  if (head.next == null) return head;
  let newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}

function generateList(length) {
  if (length === 0) return null;
  let head = { index: 0, next: {} };
  let floatHead = head.next;
  for (let i = 1; i < length; i++) {
    floatHead.index = i;
    floatHead.next = i === length - 1 ? null : {};
    floatHead = floatHead.next;
  }
  return head;
}

function getListAsArrayOfIndexes(obj) {
  let str = [];
  while (obj) {
    str.push(obj.index);
    obj = obj.next;
  }

  return str;
}

function main() {
  let list = generateList(100),
    originalList = this.getListAsArrayOfIndexes(list),
    reverseList = this.getListAsArrayOfIndexes(this.reverseList(list));

  let testIsPassed = (originalList, reverseList) => {
    if (originalList.length != reverseList.length) return false;
    for (let i = 0; i < originalList.length; i++) {
      if (originalList[i] != reverseList[originalList.length - 1 - i])
        return false;
    }

    return true;
  };
  console.log(testIsPassed(originalList, reverseList));
}
