<example-tag>
  <p><a onclick={this.add}>{opts.sum} Lorem ipsum dolor sit amet, consectetur
  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua.</a> Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
  deserunt mollit anim id est laborum.</p>
  <div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.</p>
  </div>

  <svg xmlns="http://www.w3.org/2000/svg">
    <rect height="100" width="100" />
  </svg>

  <style>
    :scope {
      display: block;
    }

    p {
      width: 40em;
    }
  </style>

  <script>
    this.opts = opts

     if (!this.opts.sum) {
       this.opts.sum = 0
     }

    /**
     * Add two numbers.
     * @param {number} a The first number.
     * @param {number} b The second number.
     * @returns {number} The sum of the two numbers.
     */
     this.add = function () {
       this.opts.sum = parseInt(this.opts.sum, 10) + 1
       this.update()
     }.bind(this)
  </script>
</example-tag>
