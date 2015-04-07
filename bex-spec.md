# BEX - Browser Editor for XML

Node
- Element
- Text
- Attribute
- Other
- List

### Core methods

#### Manipulation

new
insertBefore
insertAfter
appendNode
setData
setName
unbind
destroy

List->
remove

#### Traversal

children
parent
ancestors
descendants
followingSibling
followingSiblings
precedingSibling
precedingSiblings
attributes
attribute()
name

### Derived methods

#### Manipulation

moveBeforePreceding
moveAfterFollowing
moveAfterParent
moveIntoPreceding
append
prepend
before
after

$text->bisect ::= insertAfter, substring

### Attributes
addAttribute
setAtrribute
removeAttribute
renameAttribute (derived from add and remove)

#### Focus

Focus vs selection:
What has focus has selection by default, and does not lose it until another element gains focus, unless:
a) text selection within an element
b) Selection of multiple elements is happening (document-wide flag)
