import React from 'react'

function Homecard() {
  return (
    < section class=" mb-6 border bg-neutral-100 p-4 rounded-lg max-w-full bg-neutral-100">
    <div class="mx-auto">
        <div class="card md:flex max-w-lg">
            <div class="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
                <img class="object-cover rounded-full" src="https://tailwindflex.com/public/images/user.png" />
            </div>
            <div class="flex-grow text-center md:text-left">
                <p class="font-bold">Senior Developer</p>
                <h3 class="text-xl heading">John Doe</h3>
                <p class="mt-2 mb-3">John is a Senior Developer, mainly works in backend technologies.</p>
                <div>
                    <span class="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm">Discrete Math</span>
                    <span class="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm">Topology</span> 
                    <span class="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm">Neural Nets</span>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Homecard
